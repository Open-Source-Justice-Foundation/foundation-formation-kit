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
import { FFK_EMAIL_FOOTER_LOGO } from "~/lib/auth/providers/email/constants/constants";
import { emailStyles } from "~/lib/auth/styles/emails";
import type { CustomSendVerificationRequestEmailTemplateProps } from "~/lib/auth/types";
import { SUPPORT_EMAIL_URI } from "~/lib/emails/constants/constants";
import { INTER_FONT_URL } from "~/lib/fonts/constants/constants";

export function ResetEmailAddressRequestEmailTemplate(
  props: Readonly<CustomSendVerificationRequestEmailTemplateProps>,
) {
  const { url } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Email Address Reset</title>
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
      <Preview>Here&apos;s your requested email address reset link</Preview>
      <Container style={emailStyles.container}>
        <Section style={emailStyles.sectionContent}>
          <Row>
            <Text style={emailStyles.textContent}>Hey there,</Text>
          </Row>
          <Row>
            <Text style={emailStyles.textContent}>
              Reset the email address for your account by clicking the link
              below.
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
              Reset email address
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
