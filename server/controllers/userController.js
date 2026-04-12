const db = require("../db/database");
const bcrypt = require("bcryptjs");

// ---------------- UPDATE USER ----------------
function updateUser(req, res) {
  try {
    const userId = Number(req.params.id);

    const { fullName, email, phone, location, bio } = req.body;

    const existingUser = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(userId);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    db.prepare(
      `
      UPDATE users
      SET full_name = ?, email = ?, location = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(fullName, email, location || "", userId);

    const updatedUser = db
      .prepare(
        `
        SELECT id, full_name, email, role, location, member_since
        FROM users
        WHERE id = ?
      `
      )
      .get(userId);

    return res.json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      message: "Failed to update user.",
    });
  }
}

// ---------------- UPDATE PASSWORD ----------------
function updatePassword(req, res) {
  try {
    const userId = Number(req.params.id);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Both current and new password are required.",
      });
    }

    const user = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const isMatch = bcrypt.compareSync(
      currentPassword,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect.",
      });
    }

    const newHash = bcrypt.hashSync(newPassword, 10);

    db.prepare(
      `
      UPDATE users
      SET password_hash = ?
      WHERE id = ?
    `
    ).run(newHash, userId);

    return res.json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).json({
      message: "Failed to update password.",
    });
  }
}

module.exports = {
  updateUser,
  updatePassword,
};
