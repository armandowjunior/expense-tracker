import { CgSmileSad } from "react-icons/cg";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="not-found">
      <CgSmileSad className="sad-face" />
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>
        <Link to={"/"}>Go back</Link> to the Expense Tracker
      </p>
    </div>
  );
};

export default Page404;
