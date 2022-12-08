const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);