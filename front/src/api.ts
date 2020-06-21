import { getCookie } from "@/utils/cookie";

const APIHost = "http://localhost:3000";

export const fetchAPI = async (endpoint: string, method: string, data: any): Promise<any> => {
  const url = APIHost + endpoint;
  const options: any = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCookie("CSRF-Token"),
    },
  };
  if (method === "GET") {
    options.data = data;
  } else {
    options.body = JSON.stringify(data);
  }
  return fetch(url, options).then(
    (response) =>
      response.json().catch((e) => {
        console.log("fetch error", response, e);
        return { error: e.toString() };
      }),
    (error) => ({ error: error.toString() })
  );
};

export const login = async (username: string, password: string): Promise<any> => {
  return fetchAPI("/auth/login", "POST", { username, password });
};

export const logout = async (): Promise<any> => {
  return fetchAPI("/auth/logout", "POST", {});
};

export const changePassword = async (password: string): Promise<any> => {
  return fetchAPI("/auth/changePassword", "POST", { password });
};

export const getQuizList = async (): Promise<any> => {
  return fetchAPI("/quiz/list", "GET", {});
};

export const getQuizDetails = async (id: number): Promise<any> => {
  return fetchAPI(`/quiz/${id}`, "GET", {});
};
