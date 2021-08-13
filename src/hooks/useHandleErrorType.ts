import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { API_ERRORS_TYPE } from "~src/utils";

type useHandleErrorType = { errorMessage: string; defaultErrorText: string };
// eslint-disable-next-line no-unused-vars
type useHandleErrorReturnType = ({ errorMessage, defaultErrorText }: useHandleErrorType) => void;

export const useHandleError = (): useHandleErrorReturnType => {
  const { t } = useTranslation();

  return ({ errorMessage, defaultErrorText }: useHandleErrorType) => {
    switch (errorMessage) {
      case API_ERRORS_TYPE.BAD_GATEWAY:
        toast.error(t("BAD_GATEWAY"));
        break;

      case API_ERRORS_TYPE.BAD_REQUEST:
        toast.error(t("BAD_REQUEST"));
        break;

      case API_ERRORS_TYPE.GATEWAY_TYMEOUT:
        toast.error(t("GATEWAY_TYMEOUT"));
        break;

      case API_ERRORS_TYPE.NOT_FOUND:
        toast.error(t("NOT_FOUND"));
        break;

      case API_ERRORS_TYPE.SERVER_ERROR:
        toast.error(t("SERVER_ERROR"));
        break;

      case API_ERRORS_TYPE.FORBIDDEN:
        toast.error(t("FORBIDDEN"));
        break;

      default:
        toast.error(defaultErrorText);
        break;
    }
  };
};
