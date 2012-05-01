class ScoresController < ApplicationController
  def index
    @scores = Score.all(:order => 'score DESC', :limit => 10)
	respond_to do |format|
		format.json{
			render json: @scores
			}
	end
  end
  
  def create
    @score = Score.new(params[:score])
	
	respond_to do |format|
		if @score.save
			format.json{
				render json: @score, status: :created, location: @score
			}
		else
			format.json{
				render json: @score.errors, status: :unprocessable_entity 
			}
		end
	end
  end
  
end
