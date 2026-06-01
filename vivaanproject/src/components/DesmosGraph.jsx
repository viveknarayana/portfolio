import { useEffect, useRef } from 'react';
import './DesmosGraph.css';

const DesmosGraph = ({ functionStr, moves, intervals, yMin = -5, yMax = 20 }) => {
  const calculatorRef = useRef(null);
  const calculatorInstanceRef = useRef(null);
  const renderedExpressionsRef = useRef(new Set());

  useEffect(() => {
    if (calculatorRef.current && !calculatorInstanceRef.current) {
      calculatorInstanceRef.current = window.Desmos.GraphingCalculator(
        calculatorRef.current,
        {
          expressions: false,
          settingsMenu: false,
          zoomButtons: false,
          expressionsTopbar: false,
          lockViewport: true,
        }
      );

      calculatorInstanceRef.current.setMathBounds({
        left: -0.5,
        right: 10.5,
        bottom: yMin,
        top: yMax,
      });
    }
  }, [yMin, yMax]);

  useEffect(() => {
    if (calculatorInstanceRef.current && functionStr) {
      calculatorInstanceRef.current.setExpression({
        id: 'main_function',
        latex: `f(x) = ${functionStr}`,
        color: '#000000',
        lineWidth: 3,
      });
    }
  }, [functionStr]);

  useEffect(() => {
    if (calculatorInstanceRef.current && moves && intervals) {
      console.clear();
      console.log(`[DEBUG] Rendering ${intervals.length} intervals at`, new Date().toISOString());
      intervals.forEach((intv, i) => {
        const move = moves[intv.move_index];
        const numRects = move?.rectangles?.length || 0;
        console.log(`  [${i}] ${intv.player} [${intv.start}-${intv.end}] move_idx=${intv.move_index} card=${move?.card_type} rects=${numRects}`);
      });
      
      const allCurrentExpressions = new Set();
      
      intervals.forEach((interval, idx) => {
        const move = moves[interval.move_index];
        if (!move) return;
        
        // Get color based on player type (works for both single & multiplayer)
        const color = (interval.player === 'HUMAN' || interval.player === 'PLAYER1') ? '#2E86DE' : '#EE5A6F';
        
        if (move.card_type === 'INTEGRAL') {
          const posId = `interval_${idx}_${interval.start}_${interval.end}_pos`;
          const negId = `interval_${idx}_${interval.start}_${interval.end}_neg`;
          allCurrentExpressions.add(posId);
          allCurrentExpressions.add(negId);
          
          // Positive region: area between y=0 and f(x) where f(x) >= 0
          calculatorInstanceRef.current.setExpression({
            id: posId,
            latex: `0 \\le y \\le f(x) \\{${interval.start} \\le x \\le ${interval.end}\\} \\{f(x) \\ge 0\\}`,
            color: color,
            fillOpacity: 0.4,
            lineOpacity: 0,
          });
          
          // Negative region: area between f(x) and y=0 where f(x) < 0
          calculatorInstanceRef.current.setExpression({
            id: negId,
            latex: `f(x) \\le y \\le 0 \\{${interval.start} \\le x \\le ${interval.end}\\} \\{f(x) < 0\\}`,
            color: color,
            fillOpacity: 0.4,
            lineOpacity: 0,
          });
        } else if (move.rectangles) {
          move.rectangles.forEach((rect, rectIndex) => {
            let x1 = rect.x;
            let x2 = x1 + rect.width;
            
            // Clip rectangle to interval bounds with epsilon for floating point
            const epsilon = 0.001;
            x1 = Math.max(x1, interval.start - epsilon);
            x2 = Math.min(x2, interval.end + epsilon);
            
            // Only render if rectangle has width after clipping
            if (x2 > x1 + epsilon) {
              const rectId = `rect_${idx}_${interval.move_index}_${rectIndex}`;
              allCurrentExpressions.add(rectId);
              
              const y = rect.height;
              calculatorInstanceRef.current.setExpression({
                id: rectId,
                latex: `\\operatorname{polygon}((${x1},0),(${x1},${y}),(${x2},${y}),(${x2},0))`,
                color: color,
                fillOpacity: 0.3,
                lineOpacity: 0.7,
                lineWidth: 1.5,
              });
            }
          });
        }
      });
      
      for (const oldExpr of renderedExpressionsRef.current) {
        if (!allCurrentExpressions.has(oldExpr)) {
          calculatorInstanceRef.current.removeExpression({ id: oldExpr });
        }
      }
      
      renderedExpressionsRef.current = allCurrentExpressions;
    }
  }, [moves, intervals]);

  return (
    <div className="desmos-container">
      <div ref={calculatorRef} className="desmos-calculator"></div>
    </div>
  );
};

export default DesmosGraph;
