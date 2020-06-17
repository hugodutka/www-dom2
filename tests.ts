import "chai-http";
import * as chai from "chai";
chai.use(require("chai-http"));
const cookie = require("cookie");
import app from "./app";
const expect = chai.expect;

const baseUrl = "http://localhost:3000";
const provideAgent = (f: Function) => async () => await f(chai.request.agent(baseUrl));
const csrfCookie = "CSRF-Token";
const csrfHeader = "X-CSRF-TOKEN";
const getCsrfToken = async (agent) => {
  const r1 = await agent.get("/");
  const cookies = cookie.parse(r1.headers["set-cookie"].join("; "));
  return cookies[csrfCookie];
};
const get = (agent, csrfToken) => (...args) => agent.get(...args).set(csrfHeader, csrfToken);
const post = (agent, csrfToken) => (...args) => agent.post(...args).set(csrfHeader, csrfToken);

before((done) => {
  app.on("serverListening", async () => {
    done();
  });
});

describe("general", () => {
  it(
    "html",
    provideAgent(async (agent) => {
      const r = await agent.get("/");
      expect(r).to.have.status(200);
      expect(r).to.be.html;
    })
  );

  it(
    "csrf-set",
    provideAgent(async (agent) => {
      const r = await agent.get("/");
      expect(r).to.have.cookie(csrfCookie);
    })
  );

  it(
    "csrf-rejected",
    provideAgent(async (agent) => {
      const r = await agent.post("/quiz/list");
      expect(r).to.have.status(403);
    })
  );

  it(
    "csrf-accepted",
    provideAgent(async (agent) => {
      const csrfToken = await getCsrfToken(agent);
      const r2 = await agent.get("/quiz/list").set(csrfHeader, csrfToken);
      expect(r2).to.have.status(401);
    })
  );
});

describe("auth", () => {
  it(
    "login",
    provideAgent(async (agent) => {
      const csrfToken = await getCsrfToken(agent);
      const r = await post(
        agent,
        csrfToken
      )("/auth/login").send({ username: "hugo", password: "password" });
      expect(r).to.have.status(200);
      const r2 = await get(agent, csrfToken)("/quiz/list").set(csrfHeader, csrfToken);
      expect(r2).to.have.status(200);
    })
  );

  it(
    "logout",
    provideAgent(async (agent) => {
      const csrfToken = await getCsrfToken(agent);
      const r = await post(
        agent,
        csrfToken
      )("/auth/login").send({ username: "hugo", password: "password" });
      expect(r).to.have.status(200);

      const r2 = await get(agent, csrfToken)("/quiz/list");
      expect(r2).to.have.status(200);

      const r3 = await post(agent, csrfToken)("/auth/logout");
      expect(r3).to.have.status(200);

      const r4 = await get(agent, csrfToken)("/quiz/list");
      expect(r4).to.have.status(401);
    })
  );

  it(
    "changePassword",
    provideAgent(async (agent) => {
      const csrfToken = await getCsrfToken(agent);
      const r1 = await post(
        agent,
        csrfToken
      )("/auth/login").send({ username: "hugo", password: "password" });
      expect(r1).to.have.status(200);

      const r2 = await get(agent, csrfToken)("/quiz/list");
      expect(r2).to.have.status(200);

      const agent2 = chai.request.agent(baseUrl);
      const csrfToken2 = await getCsrfToken(agent2);

      const r3 = await post(
        agent2,
        csrfToken2
      )("/auth/login").send({ username: "hugo", password: "password" });
      expect(r3).to.have.status(200);

      const r4 = await post(agent2, csrfToken2)("/auth/changePassword").send({ password: "pass" });
      expect(r4).to.have.status(200);

      const r5 = await get(agent, csrfToken)("/quiz/list");
      expect(r5).to.have.status(401);
    })
  );
});
