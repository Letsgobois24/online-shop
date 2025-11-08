// Validasi Full Name
const fullname = (fullname: string) => {
  if (!fullname.trim()) {
    return "Full Name is required";
  }
};

// Validasi Email
const email = (email: string) => {
  if (!email.trim()) {
    return "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Format email tidak valid";
  }
};

const phone = (phone: string) => {
  if (!phone.trim()) {
    return "Email is required";
  } else if (!/^\+?\d{10,15}$/.test(phone)) {
    return "Nomor telepon tidak valid";
  }
};

const password = (password: string) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password minimal 8 karakter";
  }
};

const confirmPassword = (confirmPassword: string, password: string) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (password !== confirmPassword) {
    return "Password isn't same";
  }
};

const validation = { fullname, email, phone, password, confirmPassword };
export default validation;
