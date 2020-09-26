import { rest } from "msw";
import { API_URL } from "../constants";

export const handlers = [
  rest.get(`${API_URL}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json([
        {
          id: 1,
          title: "Restaurantes",
          description: "Alimentos servidos en un establecimiento formal",
          active: true,
          created_at: "2020-09-25T14:24:19.063Z",
          updated_at: "2020-09-25T14:24:19.063Z"
        },
        {
          id: 2,
          title: "Bebidas",
          description: "Bebidas",
          active: true,
          created_at: "2020-09-25T14:24:19.063Z",
          updated_at: "2020-09-25T14:24:19.063Z"
        },
        {
          id: 3,
          title: "Servicios",
          description: "Servicios",
          active: true,
          created_at: "2020-09-25T14:24:19.063Z",
          updated_at: "2020-09-25T14:24:19.063Z"
        }
      ])
    );
  }),
  rest.get(`${API_URL}/business`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json([
        {
          id: 1,
          title: "Restaurantes",
          description: "Alimentos servidos en un establecimiento formal",
          active: true,
          created_at: "2020-09-25T14:24:19.063Z",
          updated_at: "2020-09-25T14:24:19.063Z"
        },
        {
          id: 2,
          title: "Bebidas",
          description: "Bebidas",
          active: true,
          created_at: "2020-09-25T14:24:19.063Z",
          updated_at: "2020-09-25T14:24:19.063Z"
        },
        {
          id: 3,
          title: "Servicios",
          description: "Servicios",
          active: true,
          created_at: "2020-09-25T14:24:19.063Z",
          updated_at: "2020-09-25T14:24:19.063Z"
        }
      ])
    );
  })
];
