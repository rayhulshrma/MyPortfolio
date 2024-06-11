import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Newsletter } from "./Newsletter";

// Seedhe values ko use karein
const mailchimpUrl = "https://example.us1.list-manage.com/subscribe/post?u=your_u&id=your_id";
const mailchimpU = "your_u";
const mailchimpId = "your_id";

export const MailchimpForm = () => {
  return (
    <>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <Newsletter
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    </>
  );
};
