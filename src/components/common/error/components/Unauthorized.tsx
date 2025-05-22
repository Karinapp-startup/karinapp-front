"use client";

import { ErrorPage } from "..";

export function Unauthorized() {
  return <ErrorPage code="401" />;
} 