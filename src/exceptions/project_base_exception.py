class ProjectBaseException(Exception):
    def __init__(self, msg):
        super().__init__()
        self.args = msg
