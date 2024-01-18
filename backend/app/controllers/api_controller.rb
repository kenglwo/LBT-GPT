class ApiController < ApplicationController
    def test
        render json: {"status": "success"}

    end

    def save_student_data
        student_data = params['student_data']
        logger.debug student_data
    end
end
