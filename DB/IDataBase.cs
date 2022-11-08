using Lab2.Models;
using System.Collections.Generic;
using System.Data;

namespace Lab2.DB
{
    public interface IDataBase
    {
        public abstract DataTable GetData(Profile profile, bool isAttackEnabled);
        public abstract void InsertData(Profile profile);
    }
}
