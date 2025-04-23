package org.example.User;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class Passwd
{
    private static final String SHA_ALGORITHM = "SHA-256";
    private String passwd = "";
    private String salt = "";

    public static String generateSalt()
    {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public Passwd(String passwd)
    {
        setPassword(passwd);
    }

    public Passwd(String passwd, String salt)
    {
        this.passwd = passwd;
        this.salt = salt;
    }

    public void setPassword(String passwd)
    {
        salt = generateSalt();
        StringBuilder hash = new StringBuilder();
        if (!generatePasswdHash(passwd, salt, hash))
        {
            System.out.println("ERROR: no password created!!");
            salt = "";
        }
        this.passwd = hash.toString();

    }

    private boolean generatePasswdHash(String passwd, String salt, StringBuilder passHash)
    {
        MessageDigest digest = null;
        try
        {
            digest = MessageDigest.getInstance(SHA_ALGORITHM);
        }
        catch (NoSuchAlgorithmException e)
        {
            System.out.println(e.getMessage());
            return false;
        }
        String saltedPasswd = salt + passwd;
        byte[] hash = digest.digest(saltedPasswd.getBytes(StandardCharsets.UTF_8));
        passHash.append( Base64.getEncoder().encodeToString(hash));

        return true;
    }

    public boolean checkPassword(String checkPasswd)
    {
        StringBuilder checkHash = new StringBuilder();
        if (generatePasswdHash(checkPasswd, salt, checkHash))
        {
            System.out.println("OLDPW:" + passwd);
            System.out.println("NEWPW:" + checkHash);
            return checkHash.toString().equals(passwd);
        }
        return false;
    }

}
