import { redirect } from "next/navigation"
import { defaultLanguage } from "@/lib/lang"

export default function RootPage() {
  redirect(`/${defaultLanguage}`)
}
