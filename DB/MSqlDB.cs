using System;
using Lab2.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using Lab2.Models;

namespace Lab2.DB
{
    public class MSqlDB : IDataBase
    {
        public MSqlDB(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private static IConfiguration _configuration;
        private static SqlConnection _dbClient;

        public void InsertData(Profile profile)
        {
            string query = "INSERT INTO Profiles (Email, Password, FirstName, LastName) VALUES (@Email, @Password, @FirstName, @LastName)";
            _dbClient = new SqlConnection(_configuration["MSql:ConnectionString"]);
            SqlCommand command = new SqlCommand(query, _dbClient);
            command.Parameters.AddWithValue("@Email", profile.email);
            command.Parameters.AddWithValue("@Password", profile.password);
            command.Parameters.AddWithValue("@FirstName", profile.firstName);
            command.Parameters.AddWithValue("@LastName", profile.lastName);
            _dbClient.Open();
            command.ExecuteNonQuery();
            _dbClient.Close();
        }

        public DataTable GetData(Profile profile, bool isAttackEnabled)
        {
            SqlCommand command;
            if (isAttackEnabled)
            {
                string query = "SELECT * FROM Profiles WHERE Email = '" + profile.email + "' AND Password = '" + profile.password + "'";

                _dbClient = new SqlConnection(_configuration["MSql:ConnectionString"]);
                command = new SqlCommand(query, _dbClient);
                _dbClient.Open();
            }
            else
            {
                string query = "SELECT * FROM Profiles WHERE Email = @Email AND Password = @Password";
                _dbClient = new SqlConnection(_configuration["MSql:ConnectionString"]);
                command = new SqlCommand(query, _dbClient);
                command.Parameters.AddWithValue("@Email", profile.email);
                command.Parameters.AddWithValue("@Password", profile.password);
                _dbClient.Open();
            }

            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataSet data = new DataSet();
            adapter.Fill(data);
            return data.Tables[0];
        }
    }
}