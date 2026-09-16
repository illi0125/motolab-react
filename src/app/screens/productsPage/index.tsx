import { Route, Switch, useRouteMatch } from "react-router-dom";
import "../../../css/products.css";
import type { CartItem } from "../../../lib/types/search";
import Motorcycles from "./Motorcycle";
import ChosenMotorcycle from "./ChosenMotorcycle";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function MotorcyclesPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const motorcycle = useRouteMatch();
  return (
    <div className="products-page">
      <Switch>
        <Route path={`${motorcycle.path}/:productId`}>
          <ChosenMotorcycle onAdd={onAdd} />
        </Route>
        <Route path={`${motorcycle.path}`}>
          <Motorcycles onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
