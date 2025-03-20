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
import { CustomSendVerificationRequestEmailTemplateProps } from "~/lib/auth/types";

export function CustomSendVerificationRequestEmailTemplate(
  props: Readonly<CustomSendVerificationRequestEmailTemplateProps>,
) {
  const { url, theme } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Email Verification</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Arial", "Helvetica", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2",
            format: "woff2",
          }}
          fontWeight="100 900"
          fontStyle="normal"
        />
      </Head>
      <Preview>Verify your email address to get started!</Preview>
      <Container style={{ backgroundColor: theme.background }}>
        <Section>
          <Row>
            <Heading
              as="h1"
              m={24}
              style={{
                fontWeight: 600,
                fontSize: "24px",
                color: theme.foreground,
                textAlign: "center",
              }}
            >
              Welcome to the Foundation Formation Kit!
            </Heading>
          </Row>
        </Section>
        <Section style={{ color: theme.secondaryForeground }}>
          <Row>
            <Text style={{ fontSize: "16px" }}>Hi,</Text>
          </Row>
          <Row>
            <Text style={{ fontSize: "16px" }}>
              The Foundation Formation Kit offers a kit of resources to turn any
              open-source project into a tax-exempt non-profit foundation.
            </Text>
          </Row>
          <Row>
            <Text style={{ fontSize: "16px" }}>
              Verify your email address by clicking the link below and then get
              started with your application!
            </Text>
          </Row>
        </Section>
        <Section style={{ textAlign: "center", marginTop: "16px" }}>
          <Row>
            <Button
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: theme.primary,
                color: theme.primaryForeground,
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            >
              Verify email address
            </Button>
          </Row>
        </Section>
        <Hr style={{ borderColor: theme.border, margin: "32px 0px 16px" }} />
        <Section>
          <Row>
            <Text
              style={{
                fontSize: "14px",
                color: theme.secondaryForeground,
                marginBottom: "24px",
              }}
            >
              Need help?{" "}
              <Link
                href="mailto:info@opensourcejustice.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "14px", color: theme.linkForeground }}
              >
                Contact us
              </Link>
            </Text>
          </Row>
          <Row>
            <Img
              src="https://foundationformationkit.org/images/logos/emails/logo.png"
              alt="Foundation Formation Kit Logo"
              width="49"
              height="56"
              style={{
                textAlign: "center",
                margin: "0 auto",
              }}
            />
          </Row>
          <Row>
            <Text
              style={{
                fontSize: "14px",
                color: theme.secondaryForeground,
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} Open Source Justice Foundation, Inc.
              ⚖️
            </Text>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
