interface CustomEmailConfig {
  from: string | undefined;
  apiKey: string | undefined;
}

export type CustomEmailProviderSendVerificationRequestParams = {
  identifier: string;
  url: string;
  provider: CustomEmailConfig;
};

export type CustomSendVerificationRequestEmailTemplateProps = {
  url: string;
};
