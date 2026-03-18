import React, { useState } from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await response.json();

      if (response.ok) {
        toast.success(message);
        setFormData({ email: "", subject: "", message: "" });
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to send message. Server not responding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="md:min-h-screen">
      <div className="px-4 py-8 md:py-2 m-auto max-w-screen-md">
        <h2 className="heading text-center ">Contact Us</h2>
        <p className="mb-16 lg:mb-10 font-light text-center paragraph">
          Got any issue? Want to reach us? Let us know.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="form_label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@tmail.com"
              className="form_input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="form_label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Let us know about how can we help you?"
              className="form_input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="form_label">
              Your Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="2"
              placeholder="Leave a Message..."
              className="form_input mt-1"
              required
            ></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn w-full my-4">
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
