function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Demo Settings</Text>}>
        <TextInput
          label="API key"
          settingsKey="apiKey"
          />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
