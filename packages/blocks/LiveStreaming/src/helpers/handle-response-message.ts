type T = [key: string];

export function handleResponseMessage(input: {
  responseJson: { error?: string; errors?: T };
  errorJson?: string;
  onSuccess: () => void;
  onFail: () => void;
}) {
  const { responseJson, onSuccess, onFail, errorJson } = input;

  if (responseJson && !responseJson.error && !responseJson.errors) {
    onSuccess();
  }

  if (responseJson?.error || errorJson || responseJson.errors) {
    onFail();
  }
}
