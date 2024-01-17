import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

const MyAccord = styled(Accordion)({
  backgroundColor: "#e8edf5",
  borderRadius: "5px",
  marginBottom: "1rem",
});

const MyAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "#e8edf5",
});
const MyAccordionDetails = styled(AccordionDetails)({
  backgroundColor: "#e8edf5",
});
const MyExpandMoreIcon = styled(ExpandMoreIcon)({ backgroundColor: "#e8edf5" });

function MyAccordion({ id, title, children }) {
  return (
    <MyAccord>
      <MyAccordionSummary
        expandIcon={<MyExpandMoreIcon />}
        aria-controls={`${id}-content`}
      >
        <p className="faqTitle">{title}</p>
      </MyAccordionSummary>
      <MyAccordionDetails id={`${id}-content`}>
        <p className="faqText">{children}</p>
      </MyAccordionDetails>
    </MyAccord>
  );
}

export default MyAccordion;
