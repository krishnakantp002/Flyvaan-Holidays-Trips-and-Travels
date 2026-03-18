import Contact from "../models/Contact.js";

// submit a new mapped message
export const submitMessage = async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        // Validate required fields
        if (!email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMessage = new Contact({
            email,
            subject,
            message,
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            message: "Message Sent Successfully",
            data: newMessage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send message" });
    }
};

// get all messages for admin view
export const getMessages = async (req, res) => {
    try {
        // sort by latest first
        const messages = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Successfully retrieved messages",
            data: messages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// delete a contact message
export const deleteMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMessage = await Contact.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        res.status(200).json({
            success: true,
            message: "Message successfully deleted"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete message" });
    }
};
