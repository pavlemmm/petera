export const getAuthErrorMessage = (code: string | undefined): string => {
  switch (code) {
    // Registracija i Login
    case "USER_ALREADY_EXISTS":
      return "Korisnik sa ovom email adresom već postoji.";
    case "INVALID_EMAIL":
      return "Email adresa nije u ispravnom formatu.";
    case "INVALID_PASSWORD":
      return "Email ili lozinka nisu ispravni.";
    case "PASSWORD_TOO_SHORT":
      return "Lozinka je prekratka.";
    case "USER_NOT_FOUND":
      return "Korisnik nije pronađen.";

    // Sesija i Autentifikacija
    case "UNAUTHORIZED":
      return "Niste ovlašćeni za ovu akciju. Molimo prijavite se.";
    case "SESSION_EXPIRED":
      return "Vaša sesija je istekla. Prijavite se ponovo.";

    // Rate Limiting (zaštita od spama)
    case "TOO_MANY_REQUESTS":
      return "Previše pokušaja. Molimo sačekajte malo pa pokušajte ponovo.";

    // Default poruka
    default:
      return "Došlo je do neočekivane greške. Pokušajte ponovo.";
  }
};
