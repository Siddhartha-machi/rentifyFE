import { Box, Modal } from "@mui/material";
import Header from "./src/Components/Header";
import { useAppSelector } from "./src/Redux/hooks";
import { AuthLayout } from "./src/Auth/AuthLayout";
import { AddProperty } from "./src/Components/AddProperty";
import Filters from "./src/Components/Filters";
import PropertyGrid from "./src/Components/PropertyGrid";

function App() {
  const { enableLogin, enablePropAdd } = useAppSelector((store) => store.app);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 75px)",
          position: "sticky",
          top: 0,
        }}
      >
        <Filters />
        <PropertyGrid />
      </Box>
      <Modal open={enableLogin}>
        <AuthLayout />
      </Modal>
      <Modal open={enablePropAdd}>
        <AddProperty />
      </Modal>
    </Box>
  );
}
export default App;
