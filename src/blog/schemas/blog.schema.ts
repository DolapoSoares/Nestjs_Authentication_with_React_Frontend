import * as mongoose from "mongoose";

export const BlogSchema = new mongoose.Schema({
        title: String,
        description: String,
        body: String,
        author: String,
        date_created: String,
})

// 8TOgxHpw9P4mFxUrIAvCz8bXKz4JDKRC
// uoWAb18IjcFTlHREiBW-VqrvmpvVJizKm3W7nE-gVZb_6yck291HIRCxWBvCJmus