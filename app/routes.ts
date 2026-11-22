import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("templates", "routes/templates.tsx"),
  route("preview", "routes/preview.tsx"),
];