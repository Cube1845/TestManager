using Manager.Common;

namespace Manager.User.Models.DTOs;

public record FinishTestDTO(int TestId, string StartDate, string Username, List<SelectedAnswer> SelectedAnswers);