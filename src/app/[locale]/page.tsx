import Footer from "./components/Footer";
import LocaleSwitcherSelect from "./components/LocaleSwitcherSelect";
import { ModeToggle } from "./components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { CircleChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <h1 className="bg-primary">{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
      <Button size="sm" variant="outline">
        <CircleChevronRight /> New Branch
      </Button>
      <ModeToggle />
      <Footer />
      <LocaleSwitcherSelect />
    </div>
  );
}
