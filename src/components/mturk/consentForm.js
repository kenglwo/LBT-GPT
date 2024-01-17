import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardContent } from '@mui/material';
import { logData } from '../misc/userManagement';


const ConsentForm = ({ setState, sInfo }) => {
  const [isAdult, setAdult] = useState('');
  const [hasRead, setRead] = useState('');
  const [gaveConsent, setConsent] = useState('');

  useEffect(() => {
    // Scrolls to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const completeConsent = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.timestamps.enterWelcome = time;
    sInfo.current.state = "welcome";
    sInfo.current.consent = {isAdult: isAdult, hasRead: hasRead, gaveConsent: gaveConsent}
    logData(sInfo);
    setState("welcome");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Online Consent Information
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="body1" align="left">
          <p>This task is part of a research study (STUDY2023_293) conducted by Robin Schmucker under supervision of Prof. Tom Mitchell at Carnegie Mellon University and is funded by the Air Force Office of Scientific Research (AFOSR).</p>
          <p><b>Summary</b></p>
          <p>We will collect usage data to understand how to design web-based conversational chatbots to support learners to learn online learning materials (e.g., chapters from OpenStax textbooks). Participants might have the opportunity to interact with AI-based technologies similar to “ChatGPT” and “Bing Chat”.</p>
          <p><b>Purpose</b></p>
          <p>The goal of this research is to understand how best to design web-based conversational chatbots that support individuals interacting with online learning materials. We want to study how individuals interact with different versions of the web application to understand which design promotes the best learning experience. The resulting insights will inform the design of future learning technologies.</p>
          <p><b>Procedures</b></p>
          <p>You will be given instructions and a learning session to study concepts typically taught in first year science and business undergraduate degree programs. While studying the material you will be supported by the web application. After you feel ready you can end the learning session and the application will test your understanding by asking you questions about the studied concepts. Lastly, you will receive a survey about your learning experience and a demographics survey with a few questions about your background (e.g., age range, education, …). The total estimated time for participation is 20 minutes.</p>
          <p><b>Participant Requirements</b></p>
          <p>Participation in this study is limited to individuals of age 18 and older. Participants must be located in the USA. Participants are required to use a desktop device while participating in this study.</p>
          <p><b>Risks</b></p>
          <p>The risks and discomfort associated with participation in this study are no greater than those ordinarily encountered in daily life or during other online activities. Participants may experience boredom and fatigue. Some participants will have the opportunity to interact with chatbots implemented using enterprise-grade generative AI technologies. While these technologies are continuously audited by us and the generative AI providers, there is a residual risk of these technologies producing biased or incorrect information. The risks are no greater than those associated with usage of commonly used AI-based products such as “ChatGPT” and “Bing Chat”.</p>
          <p><b>Benefits</b></p>
          <p>Participating in this study may improve the participants’ understanding of concepts typically taught in first year science and business undergraduate degree programs.</p>
          <p><b>Compensation & Costs</b></p>
          <p>The exact compensation amount that participants receive upon study completion is indicated in the survey description on the Prolific website. Prolific does not allow for prorated compensation. In the event of an incomplete survey, you must contact the research team and compensation will be determined based on what was completed and at the researchers' discretion. There will be no cost to you if you participate in this study.</p>
          <p><b>Future Use of Information</b></p>
          <p>In the future, once we have removed all identifiable information from your data, we may use the data for our future research studies, or we may distribute the data to other researchers for their research studies. We would do this without getting additional informed consent from you. Sharing of data with other researchers will only be done in such a manner that you will not be identified.</p>
          <p><b>Confidentiality</b></p>
          <p>Your Prolific ID will be used to distribute payment to you but will not be stored or linked with the research data we collect from you. Please be aware that your Prolific ID can potentially be linked to information about you on your Prolific public profile page, depending on the settings you have for your Prolific profile. We will not be accessing any personally identifying information about you that you may have put on your Prolific public profile page. Your IP address will not be captured.</p>
          <p>By participating in this research, you understand and agree that Carnegie Mellon may be required to disclose your consent form, data and other personally identifiable information as required by law, regulation, subpoena or court order. Because this study is funded by the AFOSR, we are required to provide the AFOSR, the Federal Government Inspectors General, the Comptroller General of the United States, and any of AFOSR’s authorized representatives the right of access to documents, papers, or other study-related records, to make audits, examinations, excerpts, and transcripts. Otherwise, your confidentiality will be maintained in the following manner:</p>
          <p>Your data and consent form will be kept separate. Your consent form will be stored in a secure location on Carnegie Mellon property and will not be disclosed to third parties. By participating, you understand and agree that the data and information gathered during this study may be used by Carnegie Mellon and published and/or disclosed by Carnegie Mellon to others outside of Carnegie Mellon.  However, your name, address, contact information and other direct personal identifiers will not be mentioned in any such publication or dissemination of the research data and/or results by Carnegie Mellon. Note that per regulation all research data must be kept for a minimum of 3 years. This study will not use annotation services.</p>
          <p>The researchers will take the following steps to protect participants’ identities during this study: (1) Each participant will be assigned an identifier (i.e., a string of numbers and letters) at random; (2) The researchers will record any data collected during the study by this identifier, not by name; (3) Completed consent forms and data will not be linked to the Prolific IDs; (4) Any data files will be stored on a secured storage device with strict access control, accessed only by authorized researchers; and (5) Participants’ real names will NOT be used in publications and presentations;</p>
          <p><b>Right to Ask Questions & Contact Information</b></p>
          <p>If you have any questions about this study, you should feel free to ask them by contacting the Principal Investigator now at: Robin Schmucker, Machine Learning Department, Carnegie Mellon University, 5000 Forbes Ave., Pittsburgh, PA, 15213. Email: rschmuck@andrew.cmu.edu . Phone: 412-520-4586. If you have questions later, desire additional information, or wish to withdraw your participation please contact the Principal Investigator by mail, phone or e-mail in accordance with the contact information listed above.</p>
          <p>If you have questions pertaining to your rights as a research participant; or to report concerns to this study, you should contact the Office of Research integrity and Compliance at Carnegie Mellon University.  Email: irb-review@andrew.cmu.edu . Phone: 412-268-4721.</p>
          <p><b>Voluntary Participation</b></p>
          <p>Your participation in this research is voluntary.  You may discontinue participation at any time during the research activity. To stop, click on the “Return Survey” button, or close your browser window. Refusal to participate or withdrawal of your consent or discontinued participation in the study will not result in any penalty or loss of benefits or rights to which you might otherwise be entitled. The Principal Investigator may at his/her discretion remove you from the study for any of a number of reasons. In such an event, you will not suffer any penalty or loss of benefits or rights which you might otherwise be entitled to. You may print a copy of this consent form for your records.</p>
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 1 }} />
      <Card>
        <CardContent>
          <Typography variant="body1" align="left">
          <p>After reviewing the above information, please respond to the questions below:</p>
          <div>
            <label><b>I am age 18 or older.</b></label>
            <br></br>
            <label>
              <input type="checkbox" checked={isAdult === 'Yes'} onChange={() => setAdult('Yes')}/>
              Yes
            </label>
            <label>
              <input type="checkbox" checked={isAdult === 'No'} onChange={() => setAdult('No')}/>
              No
            </label>
          </div>
          {(isAdult === 'Yes') ? (
            <div>
            <label><b>I have read and understand the information above.</b></label>
            <br></br>
            <label>
              <input type="checkbox" checked={hasRead === 'Yes'} onChange={() => setRead('Yes')}/>
              Yes
            </label>
            <label>
              <input type="checkbox" checked={hasRead === 'No'} onChange={() => setRead('No')}/>
              No
            </label>
            </div>) : (<p></p>)}
          {(hasRead === 'Yes') ? (
            <div>
            <label><b>I want to participate in this research and continue with the activity.</b></label>
            <br></br>
            <label>
              <input type="checkbox" checked={gaveConsent === 'Yes'} onChange={() => setConsent('Yes')} />
              Yes
            </label>
            <label>
              <input type="checkbox" checked={gaveConsent === 'No'} onChange={() => setConsent('No')} />
              No
            </label>
            </div>) : (<p></p>)}
            {((isAdult === 'Yes') && (hasRead === 'Yes') && (gaveConsent === 'Yes')) ? (
            <div>
              <br></br>
              <Button variant="outlined" color="primary" onClick={completeConsent}>Start Activity</Button>
            </div>) : (<p></p>)} 
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 12 }} />
    </Container>
  );
};

export default ConsentForm;
