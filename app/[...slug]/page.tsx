import { redirect } from "next/navigation";

// A única página do site é a inicial: qualquer outra rota cai aqui e é
// redirecionada em vez de mostrar um 404.
const CatchAll = () => {
    redirect("/");
};

export default CatchAll;
