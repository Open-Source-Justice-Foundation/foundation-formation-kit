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
import { emailStyles } from "~/lib/auth/styles/emails";
import { CustomSendVerificationRequestEmailTemplateProps } from "~/lib/auth/types";

export function SignInRequestEmailTemplate(
  props: Readonly<CustomSendVerificationRequestEmailTemplateProps>,
) {
  const { url } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Email Login</title>
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
      <Preview>Here&apos;s your requested sign in link</Preview>
      <Container style={emailStyles.container}>
        <Section style={emailStyles.sectionContent}>
          <Row>
            <Text style={emailStyles.textContent}>Hey there,</Text>
          </Row>
          <Row>
            <Text style={emailStyles.textContent}>
              Login to your account by clicking the link below.
            </Text>
          </Row>
        </Section>
        <Section style={emailStyles.sectionButton}>
          <Row>
            <Button
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={emailStyles.button}
            >
              Login
            </Button>
          </Row>
        </Section>
        <Hr style={emailStyles.hr} />
        <Section>
          <Row>
            <Text style={emailStyles.textFooterHelp}>
              Need help?{" "}
              <Link
                href="mailto:info@opensourcejustice.org"
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
              src="https://foundationformationkit.org/images/logos/emails/logo.png"
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
