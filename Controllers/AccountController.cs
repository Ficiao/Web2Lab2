using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Lab1.ViewModels;
using System.Linq;
using System.Security.Claims;
using Auth0.AspNetCore.Authentication;

namespace Lab1.Controllers
{
    public class AccountController : Controller
    {
        public async Task Login(string returnUrl = "/")
        {
            var authenticationProperties = new LoginAuthenticationPropertiesBuilder()
                .WithRedirectUri(returnUrl)
                .Build();

            await HttpContext.ChallengeAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
        }

        [Authorize]
        public async Task Logout()
        {
            var authenticationProperties = new LogoutAuthenticationPropertiesBuilder()
                .WithRedirectUri(Url.Action("Index", "Home"))
                .Build();

            await HttpContext.SignOutAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [Authorize]
        public IActionResult Profile()
        {
            return View(new UserProfileViewModel()
            {
                Name = User.Claims.FirstOrDefault(c => c.Type == "nickname")?.Value,
                EmailAddress = User.Identity.Name,
                ProfileImage = User.Claims.FirstOrDefault(c => c.Type == "picture")?.Value,
                Role = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value,
            });
        }

        [Authorize]
        public IActionResult Claims()
        {
            return View();
        }

        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
