"""Here we define functions to filter the user data."""
from datetime import datetime
FORMAT = "%m/%d/%Y, %I:%M:%S %p"
CONDITIONS = ['reading', 'teacher-qa-bot', 'llm-qa-bot', 'llm-chatbot']
LIKERT_CONVERTER = {
    'Strongly Disagree': 1,
    'Disagree': 2,
    'Somewhat Disagree': 3,
    'Neutral': 4,
    'Somewhat Agree': 5,
    'Agree': 6,
    'Strongly Agree': 7
}


def got_subject_right(log):
    """User indicated correct subject in the demographics survey."""
    if "demographicsAnswers" not in log:
        return False
    return log["demographicsAnswers"]["q3"]["answer"]  == "Biology"


def got_device_right(log):
    """User indicated valid device in the demographics survey."""
    return log["demographicsAnswers"]["q6"]["answer"]  == "Desktop/Laptop"


def got_valid_degree(log):
    """User indicated a high school degree or higher."""
    return log["demographicsAnswers"]["q4"]["answer"] \
        not in ["Some High School", "Primary/Elementary School"]


def did_not_cheat(log):
    """User indicated indicated that they looked up solutioon."""
    return log["surveyAnswers"]["q6"]["answer"] \
        in ["Strongly Disagree"]


def no_tab_switch_during_exam(log):
    """User switched tabs during the exam."""
    knowledge = datetime.strptime(log["timestamps"]["enterKnowledge"], FORMAT)
    survey = datetime.strptime(log["timestamps"]["enterSurvey"], FORMAT)
    if "tabSwitches" not in log:
        return True
    for switch in log["tabSwitches"]:
        if switch[0] == "exit":
            time = datetime.strptime(switch[1], FORMAT)
            if (knowledge < time) and (time < survey):
                return False
    return True
