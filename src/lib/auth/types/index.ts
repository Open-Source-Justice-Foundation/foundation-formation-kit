interface CustomEmailConfig {
  from: string | undefined;
  apiKey: string | undefined;
}

interface CustomEmailTheme {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondaryForeground: string;
  border: string;
  linkForeground: string;
}

export type CustomEmailProviderSendVerificationRequestParams = {
  identifier: string;
  url: string;
  provider: CustomEmailConfig;
  theme: CustomEmailTheme;
};

export type CustomSendVerificationRequestEmailTemplateProps = {
  url: string;
  theme: CustomEmailTheme;
};
