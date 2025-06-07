package org.example.Database;

import com.j256.ormlite.dao.Dao;
import org.example.User.User;

import java.sql.SQLException;
import java.util.List;

public class UserRepository
{
    Dao<UserEntity, Long> dao;

    private static  UserRepository instance;
    private UserRepository() throws SQLException
    {
        this.dao = Database.getUserEntitiesDao();
    }

    public static UserRepository getInstance() throws SQLException
    {
        if (instance == null)
            instance = new UserRepository();
        return instance;
    }

    public UserEntity findOrNewInDB(User user) throws SQLException
    {
        UserEntity userEntity = UserEntity.fromUser(user);
        List<UserEntity>exisiting = dao.queryForMatching(userEntity); //FIXME --> Wenn user nicht gefunden wird kanns hier ran liegen!!!!!

        if (!exisiting.isEmpty())
            userEntity = exisiting.getFirst();
        return userEntity;
    }

    public void addToDb(User user) throws SQLException
    {
        UserEntity userEntity  = UserEntity.fromUser(user);
        userEntity.setId(findOrNewInDB(user).getId());
        dao.createOrUpdate(userEntity);
    }

    public User loadUser(String login) throws SQLException
    {
        List<UserEntity> found = dao.queryForEq("login", login);
        if (!found.isEmpty())
            return UserEntity.toUser(found.getFirst());
        return null;
    }
}
