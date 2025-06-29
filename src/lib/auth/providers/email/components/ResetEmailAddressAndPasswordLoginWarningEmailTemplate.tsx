import {
  Button,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import {
  FFK_EMAIL_FOOTER_LOGO,
  INTER_FONT_URL,
  SUPPORT_EMAIL_URI,
} from "~/lib/auth/constants/constants";
import { emailStyles } from "~/lib/auth/styles/emails";

export function ResetEmailAddressAndPasswordLoginWarningEmailTemplate() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Reset Email Address and Password Login Requested</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Arial", "Helvetica", "sans-serif"]}
          webFont={{
            url: INTER_FONT_URL,
            format: "woff2",
          }}
          fontWeight="100 900"
          fontStyle="normal"
        />
      </Head>
      <Preview>
        A request has been made to reset the email address and password login
        for your account
      </Preview>
      <Container style={emailStyles.container}>
        <Section style={emailStyles.sectionContent}>
          <Row>
            <Text style={emailStyles.textContent}>Hey there,</Text>
          </Row>
          <Row>
            <Text style={emailStyles.textContent}>
              A request has been made to reset the email address and password
              login for your account
            </Text>
          </Row>
          <Row>
            <Text style={emailStyles.textContent}>
              If this request was not performed by you, contact support
              immediately by clicking the link below.
            </Text>
          </Row>
        </Section>
        <Section style={emailStyles.sectionButton}>
          <Row>
            <Button
              href={SUPPORT_EMAIL_URI}
              target="_blank"
              rel="noopener noreferrer"
              style={emailStyles.button}
            >
              Contact support
            </Button>
          </Row>
        </Section>
        <Hr style={emailStyles.hr} />
        <Section>
          <Row>
            <Text style={emailStyles.textFooterHelp}>
              Need help?{" "}
              <Link
                href={SUPPORT_EMAIL_URI}
                target="_blank"
                rel="noopener noreferrer"
                style={emailStyles.linkFooter}
              >
                Contact us
              </Link>
            </Text>
          </Row>
          <Row>
            <Img
              src={FFK_EMAIL_FOOTER_LOGO}
              alt="Foundation Formation Kit Logo"
              width="49"
              height="56"
              style={emailStyles.imgFooter}
            />
          </Row>
          <Row>
            <Text style={emailStyles.textFooterCopyright}>
              © {new Date().getFullYear()} Open Source Justice Foundation, Inc.
              ⚖️
            </Text>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
