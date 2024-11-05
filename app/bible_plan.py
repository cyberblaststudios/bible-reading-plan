import csv

BIBLE_PLAN_CSV_PATH = 'res/bibleplan.csv'

class BiblePlan():
    def __init__(self) -> None:
        self.reading_plan = dict()

        with open(file=BIBLE_PLAN_CSV_PATH, mode='r') as reading_plan_csv:
            reading_plan = csv.DictReader(reading_plan_csv)
            
            for row in reading_plan:
                self.reading_plan[row['DATE']] = {'passage': row['PASSAGE 1'], 
                                                  'video1': row['VIDEO 1'], 
                                                  'video2': row['VIDEO 2'], 
                                                  'video3': row['VIDEO 3'], 
                                                  'video4': row['VIDEO 4 (PROVERB)']}

    def get_reading_plan(self) -> dict:
        return self.reading_plan

