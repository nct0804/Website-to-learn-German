
from glob import glob
import os


def start_robot_tests():
    """
    Function to start robot tests.
    """
    import os
    os.system("robot --outputdir Results robot-tests/*.robot")

def delete_results():
    """
    Function to delete previous robot test results.
    """
    files = glob('robot-tests/Results*')
    for f in files:
        os.remove(f)