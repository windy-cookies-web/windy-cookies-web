import { Delivery } from "../components/delivery";
import { Footer } from "../components/footer";
import { Hero } from "../components/hero";
import { HowItWorks } from "../components/how-it-works";
import { Menu } from "../components/menu";
import { OrderBar } from "../components/order-bar";
import { OrderProvider } from "../components/order-provider";
import { Payment } from "../components/payment";
import { TopBar } from "../components/top-bar";

function Index() {
  return (
    <OrderProvider>
      <TopBar />
      <main>
        <Hero />
        <HowItWorks />
        <Menu />
        <Payment />
        <Delivery />
      </main>
      <Footer />
      <OrderBar />
    </OrderProvider>
  );
}

export default Index;
