import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help-page"}>
      <Container maxWidth="xl" className={"help-container"}>
        <TabContext value={value}>
          {/* Header Section */}
          <Box className={"help-header-wrapper"}>
            <div className={"category-badge-pill"}>
              <span className={"pulse-dot"} />
              <span>PILOT SUPPORT CENTER</span>
            </div>
            <h2 className={"help-title"}>
              MOTOLAB <span className={"highlight-cyan"}>HELP DESK</span>
            </h2>
          </Box>

          {/* Navigation Tabs */}
          <Box className={"help-menu"}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="motolab help navigation tabs"
              className={"table_list"}
            >
              <Tab label="TERMS OF SERVICE" value={"1"} disableRipple />
              <Tab label="FAQ" value={"2"} disableRipple />
              <Tab label="CONTACT SUPPORT" value={"3"} disableRipple />
            </Tabs>
          </Box>

          <Stack className={"help-main-content"}>
            {/* Tab 1: Terms */}
            <TabPanel value={"1"}>
              <Box className={"tab-panel-custom"}>
                <Stack className={"rules-box"}>
                  <Box className={"rules-frame"}>
                    {terms.map((termText, number) => {
                      return (
                        <div key={number} className={"term-item-card"}>
                          <span className={"term-index"}>0{number + 1}</span>
                          <p className={"term-text"}>{termText}</p>
                        </div>
                      );
                    })}
                  </Box>
                </Stack>
              </Box>
            </TabPanel>

            {/* Tab 2: FAQ */}
            <TabPanel value={"2"}>
              <Box className={"tab-panel-custom"}>
                <Stack className={"accordion-menu"}>
                  {faq.map((item, number) => {
                    return (
                      <Accordion key={number} className={"cyber-accordion"}>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon sx={{ color: "#06b6d4" }} />
                          }
                          aria-controls={`panel${number}-content`}
                          id={`panel${number}-header`}
                          className={"accordion-summary"}
                        >
                          <Typography className={"faq-question"}>
                            {item.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={"accordion-details"}>
                          <Typography className={"faq-answer"}>
                            {item.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </Box>
            </TabPanel>

            {/* Tab 3: Contact */}
            <TabPanel value={"3"}>
              <Box className={"tab-panel-custom"}>
                <Stack className={"admin-letter-box"}>
                  <Stack className={"admin-letter-container"}>
                    <Box className={"admin-letter-header"}>
                      <span className={"letter-title"}>
                        Dispatch Support Ticket
                      </span>
                      <p className={"letter-subtitle"}>
                        Have questions regarding orders, telemetry gear, or
                        track registration? Send a direct transmission to our
                        engineering team.
                      </p>
                    </Box>

                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin-letter-frame"}
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className={"admin-input-box"}>
                        <label>PILOT NAME</label>
                        <input
                          type={"text"}
                          name={"memberNick"}
                          placeholder={"Enter your full name"}
                          className={"cyber-input"}
                        />
                      </div>

                      <div className={"admin-input-box"}>
                        <label>EMAIL ADDRESS</label>
                        <input
                          type={"email"}
                          name={"memberEmail"}
                          placeholder={"Enter your email address"}
                          className={"cyber-input"}
                        />
                      </div>

                      <div className={"admin-input-box"}>
                        <label>MESSAGE TRANSMISSION</label>
                        <textarea
                          name={"memberMsg"}
                          placeholder={
                            "Describe your issue or query in detail..."
                          }
                          className={"cyber-textarea"}
                          rows={5}
                        />
                      </div>

                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "24px" }}
                      >
                        <Button
                          type={"submit"}
                          variant="contained"
                          className={"submit-btn"}
                          startIcon={<SendIcon />}
                        >
                          TRANSMIT MESSAGE
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </Box>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
