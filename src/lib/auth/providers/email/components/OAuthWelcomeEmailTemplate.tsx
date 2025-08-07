import {
  Button,
  Container,
  Font,
  Head,
  Heading,
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

export function OAuthWelcomeEmailTemplate() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Welcome to the Foundation Formation Kit!</title>
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
      <Preview>Welcome to the Foundation Formation Kit!</Preview>
      <Container style={emailStyles.container}>
        <Section>
          <Row>
            <Heading as="h1" m={24} style={emailStyles.heading}>
              Welcome to the Foundation Formation Kit!
            </Heading>
          </Row>
        </Section>
        <Section style={emailStyles.sectionContent}>
          <Row>
            <Text style={emailStyles.textContent}>Hi,</Text>
          </Row>
          <Row>
            <Text style={emailStyles.textContent}>
              The Foundation Formation Kit offers a kit of resources to turn any
              open-source project into a tax-exempt non-profit foundation.
            </Text>
          </Row>
          <Row>
            <Text style={emailStyles.textContent}>
              Get started with your first application today!
            </Text>
          </Row>
        </Section>
        <Section style={emailStyles.sectionButton}>
          <Row>
            <Button
              href={`${process.env.DOMAIN}/formation/part-1/step-1`}
              target="_blank"
              rel="noopener noreferrer"
              style={emailStyles.button}
            >
              Get started
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
