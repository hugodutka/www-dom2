const fetch = require("node-fetch");
import { assert, expect } from "chai";
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

const login = async (jar = newJar(), username = testUsername, password = testPassword) => {
  await fetchAPI("/", "GET", jar);
  const response = await fetchAPI("/auth/login", "POST", jar, { username, password });
  if (response.status !== 200) {
    console.log(response);
    const body = await response.json();
    console.log(body);
    throw new Error("login failed");
  }
  return { jar, response };
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
    const { jar } = await login();
    const r = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r.status, 200);
  });

  it("logout", async () => {
    const { jar } = await login();

    const r2 = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r2.status, 200);

    const r3 = await fetchAPI("/auth/logout", "POST", jar);
    assert.equal(r3.status, 200);

    const r4 = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r4.status, 401);
  });

  it("changePassword", async () => {
    const { jar } = await login();

    const r1 = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r1.status, 200);

    const otherJar = await login().then(({ jar }) => jar);

    const r2 = await fetchAPI("/auth/changePassword", "POST", otherJar, { password: testPassword });
    assert.equal(r2.status, 200);

    const r3 = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r3.status, 401);
  });
});

describe("quiz", () => {
  it("list", async () => {
    const { jar } = await login();
    const r = await fetchAPI("/quiz/list", "GET", jar);
    assert.equal(r.status, 200);
    assert.isTrue(r.headers.get("content-type").includes("application/json"));
    const body = await r.json();
    expect(body).to.have.property("quizzes");
  });

  it("details", async () => {
    const { jar } = await login();
    const r = await fetchAPI("/quiz/1", "GET", jar);
    assert.equal(r.status, 200);
    assert.isTrue(r.headers.get("content-type").includes("application/json"));
    const body = await r.json();
    expect(body).to.have.property("quiz");
    expect(body).to.have.property("answers");

    const quiz = body.quiz;
    expect(quiz).to.have.property("id");
    expect(quiz).to.have.property("title");
    expect(quiz).to.have.property("description");
    expect(quiz).to.have.property("questions");
  });

  it("solve post without get", async () => {
    const { jar } = await login();
    const r = await fetchAPI("/quiz/2/solve", "POST", jar, {
      answers: [
        {
          questionId: 5,
          answer: "5",
          timeFraction: "25",
        },
        {
          questionId: 6,
          answer: "5",
          timeFraction: "25",
        },
        {
          questionId: 7,
          answer: "5",
          timeFraction: "25",
        },
        {
          questionId: 8,
          answer: "5",
          timeFraction: "25",
        },
      ],
    });
    assert.equal(r.status, 400);
  });

  it("solve with not enough answers", async () => {
    const { jar } = await login();
    const r = await fetchAPI("/quiz/2/solve", "POST", jar, {
      answers: [
        {
          questionId: 5,
          answer: "5",
        },
      ],
    });
    assert.equal(r.status, 400);
  });

  it("solve", async () => {
    const { jar } = await login();
    const pre = await fetchAPI("/quiz/2", "GET", jar);
    assert.equal(pre.status, 200);
    const r = await fetchAPI("/quiz/2/solve", "POST", jar, {
      answers: [
        {
          questionId: 5,
          answer: "5",
          timeFraction: "25",
        },
        {
          questionId: 6,
          answer: "5",
          timeFraction: "25",
        },
        {
          questionId: 7,
          answer: "5",
          timeFraction: "25",
        },
        {
          questionId: 8,
          answer: "5",
          timeFraction: "25",
        },
      ],
    });
    const body = await r.json();
    assert.equal(r.status, 200);
    assert.isTrue(body.ok);
    const post = await fetchAPI("/quiz/2", "GET", jar);
    const postBody = await post.json();
    const { answers } = postBody;
    assert.isTrue(answers.every(({ time }) => Number.isInteger(time) && time === answers[0].time));
  });

  it("multiple solves not allowed", async () => {
    const answers = [
      {
        questionId: 1,
        answer: "5",
        timeFraction: "25",
      },
      {
        questionId: 2,
        answer: "5",
        timeFraction: "25",
      },
      {
        questionId: 3,
        answer: "5",
        timeFraction: "25",
      },
      {
        questionId: 4,
        answer: "5",
        timeFraction: "25",
      },
    ];
    const { jar } = await login();
    const pre = await fetchAPI("/quiz/1", "GET", jar);
    assert.equal(pre.status, 200);
    const r = await fetchAPI("/quiz/1/solve", "POST", jar, { answers });
    assert.equal(r.status, 200);
    const r2 = await fetchAPI("/quiz/1/solve", "POST", jar, { answers });
    assert.equal(r2.status, 400);
  });
});
