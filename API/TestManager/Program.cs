using Manager.Manager.Questions.QuestionBase;
using Manager.Manager.Questions.QuestionEdit;
using Manager.Manager.TestHistory.SelectedAnswers;
using Manager.Manager.TestHistory.TestHistory;
using Manager.Manager.Tests.TestManager;
using Manager.Manager.Tests.TestSettingsEdit;
using Manager.Persistence;
using Manager.User.Finish;
using Manager.User.Start;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<QuestionBaseService>();
builder.Services.AddScoped<QuestionEditService>();
builder.Services.AddScoped<TestManagerService>();
builder.Services.AddScoped<TestSettingsEditService>();
builder.Services.AddScoped<CodeGeneratorService>();
builder.Services.AddScoped<StartService>();
builder.Services.AddScoped<FinishService>();
builder.Services.AddScoped<TestHistoryService>();
builder.Services.AddScoped<SelectedAnswersService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allowAny", options =>
    {
        options
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<ManagerDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer"));
});

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>(config => 
{
    config.SignIn.RequireConfirmedEmail = false;
    config.SignIn.RequireConfirmedPhoneNumber = false;

    config.Password.RequiredUniqueChars = 0;
    config.Password.RequireNonAlphanumeric = false;
    config.Password.RequiredLength = 8;
    config.Password.RequireUppercase = false;
    config.Password.RequireLowercase = false;
})
.AddEntityFrameworkStores<ManagerDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<IdentityUser>();

app.UseCors("allowAny");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
