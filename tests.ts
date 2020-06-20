const fetch = require("node-fetch");
import { assert } from "chai";
import app from "./app";

const baseUrl = "http://localhost:3000";
const testUsername = "hugo";
const testPassword = "password";
const csrfCookie = "CSRF-Token";

const fetchAPI = async (path, method = "GET", jar = new Map(), body = {}) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: Array.from(jar.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join("; "),
      "X-CSRF-TOKEN": jar.get(csrfCookie),
    },
  };
  if (method === "GET") {
    options["data"] = body;
  } else {
    options["body"] = JSON.stringify(body);
  }
  const r = await fetch(baseUrl + path, options);
  addCookiesToJar(r, jar);
  return r;
};

const newJar = () => new Map<string, string>();

const addCookiesToJar = (response, jar): void => {
  const cookieStrs: string[] = response.headers.raw()["set-cookie"];
  for (const cookieStr of cookieStrs) {
    const pieces = cookieStr.split(";");
    const [key, value] = pieces[0].split("=");
    jar.set(key, value);
  }
};

const login = async (jar, username = testUsername, password = testPassword) => {
  await fetchAPI("/", "GET", jar);
  const loginRes = await fetchAPI("/auth/login", "POST", jar, { username, password });
  if (loginRes.status !== 200) throw new Error("login failed");
  return loginRes;
};

before((done) => {
  app.on("serverListening", async () => {
    done();
  });
});

describe("general", () => {
  it("html", async () => {
    const r = await fetchAPI("/");
    assert.equal(r.status, 200);
    assert.isTrue(r.headers.get("content-type").includes("text/html"));
  });

  it("csrf-set", async () => {
    const jar = newJar();
    await fetchAPI("/", "GET", jar);
    assert.isTrue(jar.has(csrfCookie));
  });

  it("csrf-rejected", async () => {
    const r = await fetchAPI("/", "POST");
    assert.equal(r.status, 403);
  });

  it("csrf-accepted", async () => {
    const jar = newJar();
    await fetchAPI("/", "GET", jar);
    const r = await fetchAPI("/", "POST", jar);
    assert.equal(r.status, 404);
  });
});

describe("auth", () => {
  it("login", async () => {
    const jar = newJar();
    await login(jar);
    const r = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r.status, 200);
  });

  it("logout", async () => {
    const jar = newJar();
    await login(jar);

    const r2 = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r2.status, 200);

    const r3 = await fetchAPI("/auth/logout", "POST", jar);
    assert.equal(r3.status, 200);

    const r4 = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r4.status, 401);
  });

  it("changePassword", async () => {
    const jar = newJar();
    await login(jar);

    const r1 = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r1.status, 200);

    const otherJar = newJar();
    await login(otherJar);

    const r2 = await fetchAPI("/auth/changePassword", "POST", otherJar, { password: "pass" });
    assert.equal(r2.status, 200);

    const r3 = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r3.status, 401);
  });
});
