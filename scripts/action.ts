import { useRouter } from "next/router";

export function movePage(url: string) {
  const router = useRouter();
  router.push(`/${url}`);
}
