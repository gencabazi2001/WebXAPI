using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebXAPI
{
    public interface IJwtAuthenticationMAnager
    {
        string Authenticate(string username, string password);
    }
}
