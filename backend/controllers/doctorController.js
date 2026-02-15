import db from "../config/db.js";

export const registerDoctor = async (req, res) => {
  try {
    let {
      name,
      gender,
      age,
      email,
      phone,
      city,
      institute_name,
      degree_name,
      speciality,
      yoe,
      consultation_fee,
    } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const profile_picture =
      req.file?.filename || null;

  
    if (
      !name ||
      !gender ||
      !age ||
      !city ||
      !speciality
    ) {
      return res.status(400).json({
        error: "Required fields missing",
      });
    }

    
    age = Number(age);
    yoe = Number(yoe) || 0;
    consultation_fee =
      Number(consultation_fee) || 0;

    const query = `
      INSERT INTO doctors
      (name, gender, age, email, phone, city,
       institute_name, degree_name, speciality,
       yoe, consultation_fee, profile_picture)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      name,
      gender,
      age,
      email,
      phone,
      city,
      institute_name,
      degree_name,
      speciality,
      yoe,
      consultation_fee,
      profile_picture,
    ]);

    res.json({
      message: "Doctor registered successfully",
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      error: err.message,
    });
  }
};


export const getDoctors = async (req, res) => {
  try {
  
    const page =
      Number(req.query.page) || 1;
    const limit =
      Number(req.query.limit) || 6;

    const search =
      req.query.search || "";
    const city =
      req.query.city || "";
    const speciality =
      req.query.speciality || "";

    const offset =
      (page - 1) * limit;

    
    let baseQuery = `
      FROM doctors
      WHERE name LIKE ?
    `;

    const values = [`%${search}%`];

    if (city) {
      baseQuery += ` AND city = ?`;
      values.push(city);
    }

    if (speciality) {
      baseQuery += ` AND speciality = ?`;
      values.push(speciality);
    }

    
    const [doctors] = await db.query(
      `
      SELECT * ${baseQuery}
      LIMIT ? OFFSET ?
      `,
      [...values, limit, offset]
    );

    
    const [[{ count }]] =
      await db.query(
        `
      SELECT COUNT(*) as count
      ${baseQuery}
      `,
        values
      );

    res.json({
      doctors,
      total: count,
    });

  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: err.message });
  }
};



export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;


    const [existing] = await db.query(
      `SELECT * FROM doctors WHERE id = ?`,
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }


    await db.query(
      `UPDATE doctors
       SET search_count = search_count + 1
       WHERE id = ?`,
      [id]
    );


    const [rows] = await db.query(
      `SELECT * FROM doctors WHERE id = ?`,
      [id]
    );

    res.json(rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



export const getMostSearchedDoctors = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM doctors
      ORDER BY search_count DESC
      LIMIT 4
    `);

    res.json(rows);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message }); 
  }
};

export const getTopTenDoctors = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM doctors
      ORDER BY search_count DESC
      LIMIT 10
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

