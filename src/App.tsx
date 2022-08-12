import { useDispatch, useSelector } from "react-redux";

import { StudentDetails, Form, setClasses, setMessage, setUser, setIsLoggedIn } from "components";
var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyFnryxcmH6uXewC" }).base("app8ZbcPx7dkpOnP0");
const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: Types.State) => state.app.isLoggedIn);

  function logout() {
    dispatch(setUser());
    dispatch(setMessage());
    dispatch(setClasses());
    dispatch(setIsLoggedIn(false));
  }

  async function login(user: string, cb: () => void) {
    dispatch(setMessage());
    dispatch(setUser(user));
    dispatch(setIsLoggedIn(false));

    try {
      const [student] = await base("Students")
        .select({ filterByFormula: `({Name}="${user}")` })
        .all();

      if (student == undefined) throw new Error(`${user} is not a user OR try writing First letter in upper case`);

      const classes = await base("Classes")
        .select({ filterByFormula: `OR(${(student.get("Classes") as string[])?.map((id) => `RECORD_ID()="${id}"`)})` })
        .all();

      const classmates = await base("Students")
        .select({
          filterByFormula: `AND(
            OR(${classes.map((cl: any) => `SEARCH("${cl.get("Name")}", {Classes})`)}),
            NOT(RECORD_ID()="${student.id}")
          )`,
        })
        .all();

      dispatch(setIsLoggedIn(true));
      dispatch(
        setClasses(
          classes.map((item: any) => ({
            name: item.get("Name") as string,
            students: (item.get("Students") as string[])
              .map((student) => classmates.find((mate: any) => mate.id === student)?.get("Name"))
              .filter(Boolean) as string[],
          }))
        )
      );
      cb();
    } catch (error) {
      dispatch(setMessage((error as Record<string, string>).message));
    }
  }

  return isLoggedIn ? <StudentDetails logout={logout} /> : <Form login={login} />;
};

export default App;
