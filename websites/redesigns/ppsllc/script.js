const testimonials = [
  {
    quote:
      "It was apparent to me the thoroughness of your employees, their understanding of the situation at hand and the pride they have in your company…I have passed along to the Top of House the confidence I felt with utilizing your organization.",
    name: "Michael F. Smith",
    title: "Manager Contractor Oversight",
    organization: "National Grid",
  },
  {
    quote:
      "I have had the opportunity to observe your construction crew’s work and I want you to know that they proved to be a very proficient and safety conscious group. I had the opportunity in my career to see a lot of similar crews and I have never seen a better one.",
    name: "Richard Murphy, PE",
    title: "ORU Customer",
    organization: "Orange & Rockland",
  },
  {
    quote:
      "You are a great partner, which is why we enjoy doing business with you. You understand our business, you understand our needs and you respond timely when we need you most. So, thank you for being a great partner!",
    name: "Charles A. Freni, Jr.",
    title: "Senior Vice President",
    organization: "Central Hudson",
  },
  {
    quote:
      "I just wanted to drop you a quick note to say thank you and to give some praise of your employees...it was a pleasure to do business with your company.",
    name: "Brian Hunt",
    title: "Customer Field Service",
    organization: "National Grid",
  },
  {
    quote: "PPS...a special contractor...",
    name: "Kevin Burke",
    title: "CEO",
    organization: "Con Edison",
  },
  {
    quote:
      "Central Hudson considers PPS a key business partner and highly values our business relationship",
    name: "Steve Burger",
    title: "Manager Gas Operations",
    organization: "Central Hudson",
  },
];

function TestimonialCard(message, name, position, business_name) {
  let testimonialCardDiv = document.createElement("div");
  testimonialCardDiv.className += "testimonial-card";
  let testimonialMessage = document.createElement("p");
  testimonialMessage.className += "testimonial-message";
  testimonialMessage.textContent += message;

  let fromCredentialsDiv = document.createElement("div");
  fromCredentialsDiv.className += "testimonial-from-credentials";
  let fromCredentialsName = document.createElement("p");
  fromCredentialsName.className += "testimonial-credential-name";
  fromCredentialsName.textContent += name;
  let fromCredentialsPosition = document.createElement("p");
  fromCredentialsPosition.className += "testimonial-card-posistion";
  fromCredentialsPosition.textContent += position;
  fromCredentialsDiv.append(fromCredentialsName, fromCredentialsPosition);

  let testimonialFromDiv = document.createElement("div");
  testimonialFromDiv.className += "testimonial-from-business";
  let businessLogo = document.createElement("img");
  let testimonialBusinessName = document.createElement("p");
  testimonialBusinessName.className += "testimonial-from-business-name";
  testimonialBusinessName.textContent += business_name;

  testimonialFromDiv.append(businessLogo, testimonialBusinessName);
  fromCredentialsDiv.append(
    fromCredentialsName,
    fromCredentialsPosition,
    testimonialFromDiv,
  );

  testimonialCardDiv.append(testimonialMessage, fromCredentialsDiv);

  return testimonialCardDiv;
}

const testimonialList = document.querySelector("#testimonial-list");
testimonials.forEach((testimonial) => {
  testimonialList.append(
    TestimonialCard(
      testimonial.quote,
      testimonial.name,
      testimonial.title,
      testimonial.organization,
    ),
  );
});
